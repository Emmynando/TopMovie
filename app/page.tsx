import Image from "next/image";
import prisma from "@/src/lib/db";
import SelectCategory from "@/src/component/Homepage/SelectCategory";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SelectCategory />
    </>
  );
}
