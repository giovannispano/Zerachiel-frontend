/*"use client";

import { MouseEvent } from "react";
import { Button } from "@/components/ui/button"

export default function Home() {
  const axios = require('axios');
  interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    tax_code: string;
    password: string;
    family_member: boolean;

  }
  let name: string = "";
  // Make a request for a user with a given ID
  axios.get('http://localhost:3000/users/1')
    .then(function (response) {
      // handle success
      //console.log(response);
      const User: User = response.data;
      let n: number = response.data[1];
      console.log(User.id);
      console.log(User.first_name);
      name = User.first_name;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  function n(): string {
    return name;
  }

  return (<div>
    <h1>Test</h1>
    <h2>c {n()}</h2>
    <Button onClick={apriPagina}>Cliccami</Button>
  </div>
  )
}

function apriPagina(event: MouseEvent<HTMLButtonElement>) {
  alert("ciao pippo");
}*/
"use client";

import { useEffect, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios"; // usa import, non require
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tax_code: string;
  password: string;
  family_member: boolean;
}

export default function Home() {
  const [name, setName] = useState<string>("");
  var id = 1;
  useEffect(() => {

    axios.get<User>("http://localhost:3000/users/")
      .then((response) => {
        setName(response.data.first_name);
        console.log(name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function apriPagina(event: MouseEvent<HTMLButtonElement>) {
    //alert("ciao pippo");
    id += 1;
    alert(id);
    alert(name);

  }

  return (
    <div>
      <h1>Test</h1>
      <h2>c {name || "..."}</h2> {/* Mostra "..." mentre carica */}
      <Button onClick={apriPagina}>Cliccami</Button>
    </div>
  );
}


