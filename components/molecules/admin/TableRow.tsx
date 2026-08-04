interface TableRowProps {
  no: number;
  nama: string;
  jadwal: string;
  hari: string;
  tempat: string;
}

export default function TableRow({
  no,
  nama,
  jadwal,
  hari,
  tempat,
}: TableRowProps) {
  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="px-6 py-4">{no}</td>

      <td className="px-6 py-4 font-medium">
        {nama}
      </td>

      <td className="px-6 py-4">
        {jadwal}
      </td>

      <td className="px-6 py-4">
        {hari}
      </td>

      <td className="px-6 py-4">
        {tempat}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">

          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm">
            Edit
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
            Hapus
          </button>

        </div>
      </td>

    </tr>
  );
}