import React from "react";
import { useState } from "react";

import styles from "./Login.module.css";
import Input from "../components/Form/Input.jsx";
import Button from "../components/Form/Button.jsx";

import api from "../services/api";
import useForm from "../hooks/useForm";
import { useEffect } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(true);
  const [login, setLogin] = useState(false);
  const [create, setCreate] = useState(false);
  const email = useForm("email");
  const password = useForm("password");
  const name = useForm();

  useEffect(() => {
    setLoading(false);
    setCheck(true);
    setLogin(false);
    setCreate(false);
  }, []);

  async function checkUser(event) {
    event.preventDefault();
    setCheck(false);
    setLoading(true);
    const response = await api.get(`/sessions/check-user/${email.value}`);
    setLoading(false);
    console.log(response);

    if (response.data.exists) {
      setLogin(true);
    } else {
      setCreate(true);
    }
  }

  return (
    <section className={styles.login}>
      <div className={styles.rightLogin}>
        <h1 className="title">Bem vindo ao NotezApp</h1>
        <section className="animeLeft">
          <form onSubmit={checkUser} className={styles.form}>
            {check || login ? (
              <Input
                label="Digite seu email"
                type="email"
                name="email"
                {...email}
                disabled
              />
            ) : (
              <Input
                label="Digite seu email"
                type="email"
                name="email"
                {...email}
              />
            )}

            {loading && <Button disabled>Carregando...</Button>}
            {check && <Button>Entrar</Button>}

            {login && (
              <>
                <Input
                  label="Digite sua senha"
                  type="password"
                  name="password"
                  {...password}
                />
                <Button>Entrar</Button>
              </>
            )}

            {create && (
              <>
                <Input
                  label="Digite seu nome"
                  type="name"
                  name="name"
                  {...name}
                />
                <Input
                  label="Digite sua senha"
                  type="password"
                  name="password"
                  {...password}
                />
                <Button>Criar conta</Button>
              </>
            )}
          </form>
        </section>
      </div>
    </section>
  );
};

export default Login;
