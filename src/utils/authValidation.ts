export type LoginErrors = {
    email?: string;
    password?: string;
};

export type RegisterErrors = {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
};

export type ChangePasswordErrors = {
    password?: string;
    confirmPassword?: string;
};

export type ForgetPasswordErrors = {
    email?: string;
};

export type NewCustomerErrors = {
    name?: string;
    phone?: string;
    cpf?: string;
    marca?: string;
    modelo?: string;
    placa?: string;
    ano?: string;
    cor?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
};

export type GeneralSearchErrors = {
    search?: string;
};

export function validateGeneralSearch(search: string): GeneralSearchErrors {
    const errors: GeneralSearchErrors = {};

    if (!search || search.trim() === "") {
        errors.search = "Texto de busca é necessário!";
    }

    return errors;
}

export function validateLogin(
    email: string,
    password: string
): LoginErrors {
    const errors: LoginErrors = {};

    if (!email) {
        errors.email = "Email é obrigatório!";
    } else if (!email.includes("@")) {
        errors.email = "Email inválido!";
    }

    if (!password) {
        errors.password = "Senha é obrigatória!";
    } else if (password.length < 6) {
        errors.password = "Mínimo de 6 caracteres!";
    }

    return errors;
}

export function validateRegister(
    name: string,
    email: string,
    phone: string,
    password: string
): RegisterErrors {
    const errors: RegisterErrors = {};

    if (!name) {
        errors.name = "Nome é obrigatório!";
    }

    if (!email) {
        errors.email = "Email é obrigatório!";
    } else if (!email.includes("@")) {
        errors.email = "Email inválido!";
    }

    if (!phone) {
        errors.phone = "Telefone é obrigatório!";
    } else if (phone.length < 11) {
        errors.phone = "Telefone inválido!";
    }

    if (!password) {
        errors.password = "Senha é obrigatória!";
    } else if (password.length < 6) {
        errors.password = "Mínimo de 6 caracteres!";
    }

    return errors;
}

export function validateChangePassword(
    password: string,
    confirmPassword: string
): ChangePasswordErrors {
    const errors: ChangePasswordErrors = {};

    if (!password) {
        errors.password = "Senha é obrigatória!";
    } else if (password.length < 6) {
        errors.password = "Mínimo de 6 caracteres!";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Confirmação de senha é obrigatória!";
    } else if (confirmPassword.length < 6) {
        errors.confirmPassword = "Mínimo de 6 caracteres!";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Senhas diferentes!";
    }

    return errors;
}

export function validateForgetPassword(
    email: string
): ForgetPasswordErrors {
    const errors: ForgetPasswordErrors = {};

    if (!email) {
        errors.email = "Email é obrigatório!";
    } else if (!email.includes("@")) {
        errors.email = "Email inválido!";
    }

    return errors;
};

export function validateNewCustomer(
    userData?: { name: string; phone: string; cpf: string },
    vehicleData?: { marca: string; modelo: string; placa: string; ano: string; cor: string },
    addressData?: { cep: string; logradouro: string; numero: string; bairro: string; cidade: string; estado: string }
): NewCustomerErrors {
    const errors: NewCustomerErrors = {};

    if (userData) {
        if (!userData.name?.trim()) errors.name = "Nome é obrigatório!";

        const cleanPhone = userData.phone?.replace(/\D/g, "") || "";
        if (!userData.phone?.trim()) {
            errors.phone = "Telefone é obrigatório!";
        } else if (cleanPhone.length < 10 || cleanPhone.length > 11) {
            errors.phone = "Telefone inválido!";
        }

        const cleanCpf = userData.cpf?.replace(/\D/g, "") || "";
        if (!userData.cpf?.trim()) {
            errors.cpf = "CPF é obrigatório!";
        } else if (cleanCpf.length !== 11) {
            errors.cpf = "CPF deve ter 11 dígitos!";
        }
    }

    if (vehicleData) {
        if (!vehicleData.marca?.trim()) errors.marca = "Marca é obrigatória!";
        if (!vehicleData.modelo?.trim()) errors.modelo = "Modelo é obrigatório!";

        const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
        const placaLimpa = vehicleData.placa?.replace("-", "") || "";

        if (!vehicleData.placa?.trim()) {
            errors.placa = "Placa é obrigatória!";
        } else if (!placaRegex.test(placaLimpa)) {
            errors.placa = "Placa inválida!";
        }

        const anoNum = parseInt(vehicleData.ano);
        const anoAtual = new Date().getFullYear();
        if (!vehicleData.ano?.trim()) {
            errors.ano = "Ano é obrigatório!";
        } else if (isNaN(anoNum) || anoNum < 1900 || anoNum > anoAtual + 1) {
            errors.ano = "Ano inválido!";
        }

        if (!vehicleData.cor?.trim()) errors.cor = "Cor é obrigatória!";
    }

    if (addressData) {
        const cleanCep = addressData.cep?.replace(/\D/g, "") || "";
        if (!cleanCep) errors.cep = "CEP é obrigatório!";
        else if (cleanCep.length !== 8) errors.cep = "CEP inválido!";

        if (!addressData.logradouro?.trim()) errors.logradouro = "Rua é obrigatória!";
        if (!addressData.numero?.trim()) errors.numero = "Nº é obrigatório!";
        if (!addressData.bairro?.trim()) errors.bairro = "Bairro é obrigatório!";
        if (!addressData.cidade?.trim()) errors.cidade = "Cidade é obrigatória!";
        if (!addressData.estado?.trim() || addressData.estado.length !== 2) {
            errors.estado = "UF inválida!";
        }
    }

    return errors;
}