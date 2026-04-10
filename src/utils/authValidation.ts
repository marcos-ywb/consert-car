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
    userData: {
        name: string;
        phone: string;
        cpf: string;
    },
    vehicleData: {
        marca: string;
        modelo: string;
        placa: string;
        ano: string;
        cor: string;
    }
): NewCustomerErrors {
    const errors: NewCustomerErrors = {};

    if (!userData.name.trim()) {
        errors.name = "Nome é obrigatório!";
    }

    if (!userData.phone.trim()) {
        errors.phone = "Telefone é obrigatório!";
    } else if ((userData.phone.replace(/\D/g, "").length < 10)) {
        errors.phone = "Telefone inválido!";
    }

    if (!userData.cpf.trim()) {
        errors.cpf = "CPF é obrigatório!";
    } else if ((userData.cpf.replace(/\D/g, "").length !== 11)) {
        errors.cpf = "CPF deve ter 11 dígitos!";
    }

    if (!vehicleData.marca.trim()) {
        errors.marca = "Placa é obrigatório!";
    }

    if (!vehicleData.modelo.trim()) {
        errors.modelo = "Modelo é obrigatório!";
    }

    const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
    if (!placaRegex.test(vehicleData.placa)) {
        errors.placa = "Placa inválida!";
    }

    const anoNum = parseInt(vehicleData.ano);
    const anoAtual = new Date().getFullYear();
    if (isNaN(anoNum) || anoNum < 1900 || anoNum > anoAtual + 1) {
        errors.ano = "Ano inválido!";
    }

    if (!vehicleData.cor.trim()) {
        errors.cor = "Cor é obrigatória!";
    }

    return errors;
}
