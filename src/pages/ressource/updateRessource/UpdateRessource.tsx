import { useParams, useNavigate } from "react-router-dom";

function RessourceUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">
          Modifier le ressource #{id}
        </h3>
        <button onClick={() => navigate("/ressource")} className="text-black-500 text-xl font-bold">
          ✕
        </button>
      </div>
      {/* FORM */}
</div>
  );
}
export default RessourceUpdate;
