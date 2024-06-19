import { Center } from "@mantine/core";

export function Header() {
  return (
    <Center component="header" w="100%" py="sm" bg="dark">
      <img
        src="/logo.svg"
        alt="Logo image"
        decoding="sync"
        loading="eager"
        width={103}
        height={36}
      />
    </Center>
  );
}
