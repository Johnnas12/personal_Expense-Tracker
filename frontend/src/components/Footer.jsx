import { HeartIcon, BellIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 right-0 bg-white border-t-4 text-black p-4 flex justify-center space-x-2">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
        <HeartIcon className="h-6 w-6" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
        <BellIcon className="h-6 w-6" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
        <BellIcon className="h-6 w-6" />
      </a>
    </footer>
  );
};

export default Footer;
