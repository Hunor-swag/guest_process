"use client";

type Props = {
  isDisplayed: boolean;
  text: string;
};

function SidebarTitle({ isDisplayed, text }: Props) {
  return (
    <div className="w-full h-10 ml-1">
      <h1
        className={`pb-5 pt-2 whitespace-nowrap transition-opacity ease-in-out duration-200 opacity-0 ${
          isDisplayed && "opacity-100"
        }`}
      >
        {isDisplayed ? text : " "}
      </h1>
    </div>
  );
}

export default SidebarTitle;
