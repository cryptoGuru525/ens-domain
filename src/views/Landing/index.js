import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import components from "components";
import services from "services";

export default function Landing() {
  const [nfts, setNFTs] = useState({});
  useEffect(() => {
    async function getNFTList() {
      const recentNFTs = await services.nft.getRecentNFTs();
      console.log(recentNFTs);
      if (recentNFTs.status) {
        setNFTs(recentNFTs.nfts);
      } else {
        console.log("no data available");
      }
    }
    getNFTList();
  }, []);
  console.log(nfts);
  return (
    <>
      <div className="max-w-2xl m-auto mt-[30px] md:mt-[70px] lg:mt-[100px]">
        <div className="font-bold text-center mt-4 text-4xl">
          {"Wrapped Ethereum Name Service"}
        </div>
        <div className="text-center max-w-sm m-auto mt-4 mb-8">
          {
            "New Generation naming service for Ethereum ecosystem and its various subnets."
          }
        </div>
        <div className="mb-8 mt-[50px]">
          <components.DomainSearch />
        </div>
      </div>

      <div className="mt-[50px] md:mt-[70px] lg:mt-[80px]">
        <div className="flex justify-between px-4 items-center">
          <div className="text-sm md:text-md font-semibold">
            Recently Registered:
          </div>
          <div className="mr-0 md:mr-2">
            <Button variant="text" size="sm">
              View All
            </Button>
          </div>
        </div>
        <div className="border border-gray-100 m-2">
          <components.ScrollMenu
            containerId="all-game-container"
            leftButtonId="all-game-left"
            rightButtonId="all-game-right"
            size="350"
          >
            {nfts.length > 0
              ? nfts.map((nft, i) => (
                  <components.NFTCard name={nft.domain} isLinked={true} key={i} />
                ))
              : ""}
          </components.ScrollMenu>
        </div>
      </div>
    </>
  );
}