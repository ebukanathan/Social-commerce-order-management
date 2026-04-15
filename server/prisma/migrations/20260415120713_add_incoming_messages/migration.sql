-- CreateEnum
CREATE TYPE "MessageChannel" AS ENUM ('WHATSAPP');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('RECEIVED', 'REVIEWED', 'CONVERTED_TO_ORDER', 'IGNORED');

-- CreateTable
CREATE TABLE "IncomingMessage" (
    "id" TEXT NOT NULL,
    "businessId" TEXT,
    "customerId" TEXT,
    "channel" "MessageChannel" NOT NULL,
    "externalMessageId" TEXT,
    "senderPhone" TEXT NOT NULL,
    "senderName" TEXT,
    "messageType" TEXT NOT NULL,
    "textBody" TEXT,
    "rawPayload" JSONB NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'RECEIVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncomingMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IncomingMessage_externalMessageId_key" ON "IncomingMessage"("externalMessageId");

-- CreateIndex
CREATE INDEX "IncomingMessage_senderPhone_idx" ON "IncomingMessage"("senderPhone");

-- CreateIndex
CREATE INDEX "IncomingMessage_businessId_createdAt_idx" ON "IncomingMessage"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "IncomingMessage_customerId_idx" ON "IncomingMessage"("customerId");

-- AddForeignKey
ALTER TABLE "IncomingMessage" ADD CONSTRAINT "IncomingMessage_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
