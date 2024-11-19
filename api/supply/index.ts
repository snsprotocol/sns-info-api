import { VercelRequest, VercelResponse } from "@vercel/node";
import { getLockedSns, getTotalSupply } from "../../utils/supply";

import formatNumber from "../../utils/formatNumber";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  let lockedSns = await getLockedSns();
  lockedSns = lockedSns.div(1e18);

  const totalBurnedTokens = 0;

  const circulatingSupply = totalSupply.minus(lockedSns);

  if (req.query?.q === "totalSupply") {
    res.json(totalSupply.toNumber());
  } else if (req.query?.q === "circulatingSupply") {
    res.json(circulatingSupply.toNumber());
  } else if (req.query?.verbose) {
    res.json({
      totalSupply: formatNumber(totalSupply.toNumber()),
      circulatingSupply: formatNumber(circulatingSupply.toNumber()),
      lockedSns: formatNumber(lockedSns.toNumber()),
      maxSupply: formatNumber(totalSupply.toNumber()),
    });
  } else {
    res.json({
      totalSupply: totalSupply.toNumber(),
      burnedSupply: totalBurnedTokens,
      circulatingSupply: circulatingSupply.toNumber(),
    });
  }
};
