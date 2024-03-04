import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Info {
  text: string;
  link: String;
  btnText: String;
}

const InfoBox: FC<Info> = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link href={link} className=" neo-brutalism-white neo-btn ">
      {btnText}
    </Link>
    <Image src="/icons/arrow.svg" width={5} height={5} />
  </div>
);

const renderContact = {
  2: <InfoBox text="" link="" btnText="" />,
  3: (
    <InfoBox
      text={`Led multiple projects to success over the years. 
        Curious about the impact? `}
      link="/Projects"
      btnText="Vist my portoflio "
      key={3}
    />
  ),
  4: (
    <InfoBox
      text={`Need project done or looking for a dav? iam just a few keystrokes away`}
      link="/About"
      btnText="Learn more"
      key={4}
    />
  ),
};
interface Stages {
  currentStage: number;
}
const StageInfo = ({ currentStage }: Stages) => {
  return renderContact[currentStage] || null;
};

export default StageInfo;
