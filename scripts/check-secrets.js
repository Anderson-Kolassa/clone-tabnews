const { execSync } = require("child_process");

console.log("🔍 Verificando secrets nos arquivos staged...");

try {
  const diff = execSync("git diff --cached", { encoding: "utf-8" });

  const patterns = [
    /API_KEY/i,
    /SECRET/i,
    /TOKEN/i,
    /PASSWORD/i,
    /PRIVATE_KEY/i,
    /BEGIN RSA PRIVATE KEY/,
    /BEGIN PRIVATE KEY/,
  ];

  const found = patterns.some((pattern) => pattern.test(diff));

  if (found) {
    console.log("❌ Possível secret detectado! Commit bloqueado.");
    process.exit(1);
  }

  console.log("✅ Nenhum secret encontrado.");
} catch (err) {
  console.error("Erro ao verificar secrets:", err);
  process.exit(1);
}
