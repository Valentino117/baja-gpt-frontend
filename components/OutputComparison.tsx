type Props = {
    vanilla: string;
    fineTuned: string;
  };
  
  export default function OutputComparison({ vanilla, fineTuned }: Props) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">🔵 GPT-4.1 (Vanilla)</h2>
          <p>{vanilla}</p>
        </div>
        <div className="p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">🟠 Fine-Tuned (Baja)</h2>
          <p>{fineTuned}</p>
        </div>
      </div>
    );
  }
  