"use client";

type Props = {
  location?: string;
};

const LocationBadge = ({ location = "USA" }: Props) => {
  return (
    <div className="flex absolute md:-mt-10  md:top-[50%] right-0 md:right-auto md:left-0 md:translate-y-[-50%] md:py-4 md:pr-4 rounded-tr-full rounded-br-full md:bg-[#1C1D20]">
      <div className="text-white text-base lg:text-lg pl-8 pr-6 leading-relaxed content-center hidden md:block">
        Located in the
        <br />
        <span className="tracking-[2px] uppercase">{location}</span>
      </div>
      <div className="flex items-center ml-2">
        <span className=" w-[76px] h-[76px] text-lg font-medium text-white leading-tight flex items-center justify-center">
          <div className="digital-ball">
            <div className="overlay bg-[#999d9e] rounded-full h-full"></div>
            <div
              className="globe"
              style={{ transform: "translate(-50%, -50%)", display: "block" }}
            >
              <div className="globe-wrap">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle-hor"></div>
                <div className="circle-hor-middle"></div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default LocationBadge;
