import { VercelRequest, VercelResponse } from "@vercel/node";
import { getLockedSns, getTotalSupply } from "../../utils/supply";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {

  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  let lockedSns = await getLockedSns();
  lockedSns = lockedSns.div(1e18);

  const circulatingSupply = totalSupply.minus(lockedSns);

  res.json({
    totalSupply: totalSupply.toNumber(),
    burnedSupply: 0,
    circulatingSupply: circulatingSupply.toNumber(),
  });
};
