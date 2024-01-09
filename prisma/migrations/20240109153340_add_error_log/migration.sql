-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(1000) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "stackTrace" VARCHAR(3000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);
