"use client"
import EventsTbi from "@/components/Events/page";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/fireStore";
import { useEffect, useState } from "react";



interface Evento {
  nome: string;
  data: string;
  participantes: number;
  observacoes: string;

}


export default function Home() {
  const [name, setName] = useState<string>("")
  const [evento, setEvento] = useState<Evento>({
    nome: "",
    data: Date.now().toLocaleString(),
    participantes: 0,
    observacoes: "",
  })


 // Atualiza o estado conforme os inputs são alterados
 function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const { name, value } = e.target;
  setEvento((prev) => ({
    ...prev,
    [name]: name === "participantes" ? Number(value) : value, // Converte número
  }));
}

async function handleSave() {
  if (!evento.nome || !evento.data || evento.participantes <= 0) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "events"), evento);
    console.log("Evento salvo com ID:", docRef.id);
    alert("Evento registrado com sucesso!");

    // Limpa os inputs após salvar
    setEvento({ nome: "", data: "", participantes: 0, observacoes: "" });
  } catch (error) {
    console.error("Erro ao salvar evento:", error);
  }
}

return (
  <div className="grid items-center justify-items-center text-center min-h-screen p-8 pb-1 gap-16 sm:p-15 border text-black w-1/3 mx-auto">
    <div className="flex flex-col space-y-4 rounded bg-gray-200 w-full h-90 border">
      <h1 className="pt-4 pb-2 bg-orange-300 rounded">Eventos - Guild Conclave</h1>

      <input
        type="text"
        name="nome"
        placeholder="Digite o nome do Evento"
        className="p-2 text-center text-black"
        value={evento.nome}
        onChange={handleChange}
      />

      <input
        type="date"
        name="data"
        className="p-2 text-center text-black"
        value={evento.data}
        onChange={handleChange}
      />

      <input
        type="number"
        name="participantes"
        placeholder="Número máximo de participantes"
        className="p-2 text-center"
        value={evento.participantes || ""}
        onChange={handleChange}
      />

      <textarea
        name="observacoes"
        placeholder="Observações (Opcional)"
        className="p-2 text-center rounded min-h-32 max-h-32"
        rows={3}
        value={evento.observacoes}
        onChange={handleChange}
      />

      <button className="rounded bg-green-400 m-auto p-2" onClick={handleSave}>
        Registrar Evento
      </button>
    </div>

    <EventsTbi />
  </div>
);
}