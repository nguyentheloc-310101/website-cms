"use client";
import { IHistory } from "@/common/types";
import { cn } from "@/common/utils";
import React from "react";
import Tag, { TAction } from "./tag";
import { HISTORYS } from "@/common/dump-data";

import {
  EditOutlined,
  PlusOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

type Props = {
  className?: string;
  history: IHistory[];
};
const TYPES = {
  create: <PlusOutlined />,
  hide: <EyeInvisibleOutlined />,
  edit: <EditOutlined />,
};

export default function HistoryAside({ className, history = HISTORYS }: Props) {
  return (
    <aside
      className={cn(
        "w-[354px] bg-white border-l border-solid border-neutral-n-20",
        className
      )}
    >
      <header className="border-b-4 border-neutral-n-20 border-solid">
        <h6 className="mx-6 my-5"> Lịch sử</h6>
      </header>
      <div className="relative h-full p-6 overflow-auto">
        <div className="absolute w-[2px] bg-neutral-n-20 top-0 bottom-0 left-8"></div>
        {history?.map((item: IHistory, i: number) => (
          <section className="flex gap-6 relative" key={i}>
            <div className="bg-[#F4F5F6] basis-6 min-w-[24px] h-6 rounded-lg flex items-center justify-center self-start text-neutral-n-50">
              {TYPES[item.action.name as TAction]}
            </div>
            <div className="flex-1">
              <p>
                <b>{item.user?.email}</b> đã {item.action.display}{" "}
                <b>{item.action.scope}</b>
              </p>
              <Tag className="my-[6px]" action={item.action.name as TAction} />
              <p className="text-overline mb-6">
                {formatDate(item.created_at!)}
              </p>
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  let day: string = ("0" + date.getDate()).slice(-2); // Pad with leading 0 if needed
  let month: string = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScript months are 0-based, so add 1
  let year: string = date.getFullYear().toString();

  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} vào lúc ${hh}:${min}`;
}
