import { client } from "@/lib/ky-client";
import { server } from "@/lib/ky-server";
import { isServer } from "@tanstack/react-query";

export const ky = (() => (isServer ? server : client))();
