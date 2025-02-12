import formatMoney from '~/utils/formatMoney';
import { truncateString } from '~/utils/truncateString';

function ContributeRow({ index, contribute, handleViewContribution }) {
  const handleView = () => {
    handleViewContribution(index);
  };

  return (
    <tr>
      <td>{contribute.name}</td>
      <td>{contribute.symbol}</td>
      <td>{contribute.nfts.length}</td>
      <td className="max-w-[20px] truncate overflow-hidden whitespace-nowrap">
        {truncateString(contribute.contractAddress)}
      </td>
      <td>{contribute.ethPrice} ETH</td>
      <td className="hover:cursor-pointer hover:text-[#1c7e7f] hover:font-bold select-none">
        <span onClick={handleView}>Xem chi tiết</span>
      </td>
    </tr>
  );
}

export default ContributeRow;
