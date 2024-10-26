import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Authusertype = {
  id: string;
  fullname: string;
  email: string;
  profile: string;
  gender: string;
};

export const Authcontext = createContext<{
  authuser: Authusertype | null;
  setAuthuser: Dispatch<SetStateAction<Authusertype | null>>;
  isloading: boolean;
}>({
  authuser: null,
  setAuthuser: () => {},
  isloading: true,
});

export const AuthcontextProvider = ({ children }: { children: ReactNode }) => {
  const [authuser, setAuthuser] = useState<Authusertype | null>(null);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    async function authenticate() {
      try {
        const res = await fetch("/api/user/myinfo");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setAuthuser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setisloading(false);
      }
    }
    authenticate();
  }, []);

  return (
    <Authcontext.Provider value={{ authuser, setAuthuser, isloading }}>
      {children}
    </Authcontext.Provider>
  );
};
