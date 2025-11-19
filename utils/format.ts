
const formatCPF = (text: string) => {
    let cpf = text.replace(/\D/g, '');
    if (cpf.length > 3) cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    if (cpf.length > 6) cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    if (cpf.length > 9) cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf.substring(0, 14);
};

const formatInitialsName =(name: string): string => {
  if (!name) return "";

  const parts = name.trim().split(/\s+/);
  const first = parts[0][0].toUpperCase();
  const last = parts.length > 1 
    ? parts[parts.length - 1][0].toUpperCase()
    : "";

  return first + last;
}

export {
    formatCPF,
    formatInitialsName
};

