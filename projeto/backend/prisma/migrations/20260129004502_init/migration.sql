-- CreateTable
CREATE TABLE "Nivel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "hobby" TEXT NOT NULL,
    "nivelId" INTEGER NOT NULL,
    CONSTRAINT "Profissional_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
