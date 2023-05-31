-- CreateTable
CREATE TABLE "item" (
    "itemid" SERIAL NOT NULL,
    "itemname" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150),
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "item_pkey" PRIMARY KEY ("itemid")
);

-- CreateTable
CREATE TABLE "person" (
    "personid" SERIAL NOT NULL,
    "personname" VARCHAR(50) NOT NULL,
    "phonenumber" VARCHAR(150),
    "address" INTEGER,

    CONSTRAINT "person_pkey" PRIMARY KEY ("personid")
);

-- CreateTable
CREATE TABLE "user" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" CHAR(65) NOT NULL,
    "email" VARCHAR(150),

    CONSTRAINT "user_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "borrow" (
    "borrowid" SERIAL NOT NULL,
    "itemid" INTEGER NOT NULL,
    "personid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "borrowDate" DATE NOT NULL,
    "returnDate" DATE,
    "status" VARCHAR(150) NOT NULL,

    CONSTRAINT "borrow_pkey" PRIMARY KEY ("borrowid")
);

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("itemid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("personid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
