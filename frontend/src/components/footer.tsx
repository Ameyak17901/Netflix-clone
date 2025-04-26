const Footer = () => {
  return (
    <footer className="py-6 md:px-8 bg-black text-white border-t border-gray-800">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by{" "}
        <a
          href="https://github.com/Ameyak17901"
          target="_blank"
          className="font-medium underline underline-offset-4"
        >
          you{" "}
        </a>
        . The source code is available on{" "}
        <a
          href="https://github.com/Ameyak17901/Netflix-clone.git"
          target="_blank"
          className="font-medium underline underline-offset-4"
          rel="noreferrer"
        >
          Github
        </a>
      </p>
    </footer>
  );
};

export default Footer;
