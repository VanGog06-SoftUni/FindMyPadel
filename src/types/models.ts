import { Prisma } from "@/generated/prisma/client";

export type Game = Prisma.GameGetPayload<{
  include: {
    players: {
      include: {
        user: {
          select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
            image: true;
          };
        };
      };
    };
    host: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        image: true;
      };
    };
  };
}>;

export type Player = Prisma.GamePlayerGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        image: true;
      };
    };
  };
}>;

export type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    email: true;
    image: true;
  };
}>;
