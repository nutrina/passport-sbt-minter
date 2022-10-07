import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Button, Stack } from "@chakra-ui/react";

// --- Passport SDK
import { PassportReader } from "@gitcoinco/passport-sdk-reader";
// import { PassportVerifier } from "@gitcoinco/passport-sdk-verifier";
import { Passport, PROVIDER_ID, Stamp } from "@gitcoinco/passport-sdk-types";


const reader = new PassportReader("https://ceramic.passport-iam.gitcoin.co", "1");

// const verifier = new PassportVerifier();

function App() {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [passport, setPassport] = useState<Passport>();
  const [stamps, setStamps] = useState<Stamp[]>();
  const [filteredStamps, setFilteredStamps] = useState<Stamp[]>();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const loadedPassport = await reader.getPassport(address!);
      setPassport(loadedPassport);
      // const verifiedPassport = await verifier.verifyPassport(address!)
      // console.log("** Verified pp", verifiedPassport)
    }
    getData();
    setStamps(passport?.stamps?.map(stamp => stamp));
    setLoading(false);
  }, [address]);

  const filterStamps = () => {
    const uniqueProviders = [];

  }

  const handleMinting = () => {

  }

  const minting = 
      <Stack align="center">
        <h2 className="text-2xl font-semibold mt-6 mb-6">Welcome, {address}!</h2>
        <Button 
          className="flex justify-center m-auto mt-10 p-3 rounded-xl font-bold"
          colorScheme="purple"
          variant="solid"
        >
          Mint Your SBT
        </Button>
      </Stack> 

  return (
    <main className="bg-zinc-900 flex justify-center items-center h-screen text-white w-screen p-10">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-10 font-bold text-center">
        🛂 Passport SBT Minting
        </h1>
        <div className="flex justify-center">
          <ConnectButton showBalance={false} />
        </div>
          {
            address
            ? <div>
                {minting}
              </div>
            : <div>
                <p className="text-2xl font-semibold mt-6 mb-6 text-center">Please connect your wallet</p>
              </div>
          }
      </div>
    </main>
  );
}

export default App;
