"use client"
import EventsTbi from "@/components/Events/page";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/fireStore";
import { useEffect, useState } from "react";



interface Evento {
  nome: string;
  data: Date;
  participantes: number;
  observacoes: string;

}


export default function Home() {
  const [name, setName] = useState<string>("")
  const [data, setData] = useState<Evento[]>([])


  async function setDatas() {
    const dado: Evento[] = []
    const docRef = await addDoc(collection(db, "events"), {
      dado: name, data
    });
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <div className="grid items-center justify-items-center text-center min-h-screen p-8 pb-1 gap-16 sm:p-15 border 1px solid text-black w-1/3 mx-auto">

      <div className="flex flex-col space-y-4 rounded bg-gray-200 w-full h-90 border 1px">
        <h1 className="pt-4 pb-2 bg-orange-300 rounded">
          Eventos - Guild Conclave
        </h1>
        <input type="text" placeholder="Digite o nome do Evento" className="p-2 text-center text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="number" placeholder="Digite o número máximo de participantes" className="p-2 text-center" />
        <textarea placeholder="Observações (Opcional)" className="p-2 text-center rounded min-h-32 max-h-32" rows={3} />
        <button className="rounded bg-green-400 m-auto p-2 
        "
          onClick={() => setDatas()}
        >Registrar Evento</button>
      </div>
      <EventsTbi /> {/* esse é um componente que vai carregar abaixo com os valores enseridos nos inputs acima */}
    </div>
  );
}
