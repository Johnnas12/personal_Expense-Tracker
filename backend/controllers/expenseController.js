const Expense = require('../models/Expense')
const ResetCode = require('../models/ResetCode.js'); // Your reset code model
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');

// Adding expenses controller method
const addExpense = async (req, res) => {
 const {amount, date,  category, description} = req.body;
 const userId = req.user.id;

 try{
    const newExpense = new Expense({
        amount, 
        category, 
        date,
        description, 
        user: userId
    })

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense)
 }catch(error){
    res.status(500).json({message: "Error saving expense", error})
 }
}


// get expenses based on user id 
const getExpenses = async (req, res) => {
   try{
      const expense = await Expense.find({ user: req.user.id});
      res.status(200).json(expense)
   }catch(error){
      res.status(500).json({message: "Server Error", error: error.message})
   }
}

const editExpense =  async (req, res) => {
   try{
      const {id} = req.params;
      const {amount, category, date, description} = req.body;
      const expense = await Expense.findByIdAndUpdate(
         id,
      { amount, category, date, description },
      { new: true }
      );

      res.status(200).json(expense);
   }catch(error){
      res.status(500).json({message: "Server Error", error: error.message});
   }
}


// deleting expenses
const deleteExpenses = async (req, res) => {
   try{
      const {id} = req.params;
      await Expense.findByIdAndDelete(id);
      res.status(200).json({message: "Expenses deleted"})
   }catch(error){
      res.status(500).json({message: "Server Error"})
   }
}


// fetching expenses of a specific user based on ID
const fetchSingle = async(req, res) => {
   try{
      const {id} = req.params
      const expense = await Expense.findById(id);
      res.status(200).json(expense);
   }catch(error){
      res.status(500).json({message: error.message});
   }
}

// the same method as above **to be deleted**
const getUserExpenses = async (req, res) => {
   try {
     const userId = req.params;
     const expenses = await Expense.find({ userId });
     res.status(200).json(expenses);
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 };


const generateReport = async (req, res) => {
    try {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

        const data = await Expense.aggregate([
            {
                $match: {
                    createdAt: { $gte: last7Days }
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    totalAmount: 1,
                    _id: 0
                }
            }
        ]);

        const report = categories.reduce((acc, category) => {
            const found = data.find(item => item.category === category);
            acc[category] = found ? found.totalAmount : 0;
            return acc;
        }, {});

        res.json(report);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};
const frogotPassword = async (req, res) => {
   try {
      const { name } = req.body; // Change 'username' to 'name'
  
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
  
      // Find the user by name (not username)
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset code
      const resetCode = crypto.randomBytes(20).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // Code expires in 1 hour
  
      // Create a new reset code document
      const resetCodeDoc = new ResetCode({
        userId: user._id,
        code: resetCode,
        expiresAt
      });
      await resetCodeDoc.save();
  
      // Send reset code to the user (implementation depends on your setup)
      // e.g., send via email or SMS
  
      res.status(200).json({ message: 'Password reset code sent successfully', code: resetCode });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      res.status(500).json({ message: 'Server error' });
    }
  

}


const resetPassword = async (req, res) => {
   const {code} = req.params;
   const { newPassword } = req.body;

   try {
       const resetCode = await ResetCode.findOne({ code, expiresAt: { $gt: Date.now() } });
       if (!resetCode) {
           return res.status(400).send({ message: `Invalid or expired reset code. ${code}` });
       }

       const user = await User.findById(resetCode.userId);
       if (!user) {
           return res.status(404).send({ message: `User not found.` });
       }

       user.password = await bcrypt.hash(newPassword, 10);
       await user.save();
       await ResetCode.deleteOne({ code });

       res.send({ message: 'Password has been reset successfully.' });
   } catch (error) {
       res.status(500).send({ message: `Server error ${code}` });
   }
};

module.exports = {addExpense, getExpenses, editExpense, deleteExpenses, fetchSingle, getUserExpenses, generateReport, frogotPassword, resetPassword}