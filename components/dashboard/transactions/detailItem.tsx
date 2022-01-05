type Props = {
  name: string;
  value?: string | number;
};

export default function DetailItem({ name, value }: Props) {
  return (
    <p className="text-xs md:text-sm flex flex-col md:flex-row">
      <span className="text-sky-900 font-bold mr-2">{name}:</span>
      <span>{value}</span>
    </p>
  );
}
