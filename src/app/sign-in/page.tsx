"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import GroupField from "@/components/GroupField";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/Context";

const Login: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const userEmail = userCredential.user.email;

      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
        setUser(userEmail);
      }

      toast("Login successful!");
      router.replace("/dashboard");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <Link className="block text-white" href="/">
                <span className="sr-only">Home</span>
                <svg
                  id="logo-51"
                  width="167"
                  height="41"
                  viewBox="0 0 167 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    
                    clip-rule="evenodd"
                    d="M8.65417 3.89149C7.22351 4.89185 5.92981 6.0746 4.80676 7.40602C9.39606 6.97995 15.2266 7.67567 21.9958 11.0603C29.2244 14.6745 35.0452 14.7967 39.0962 14.0153C38.7286 12.9024 38.2658 11.8328 37.7177 10.816C33.0804 11.3051 27.1354 10.6577 20.207 7.1936C15.8074 4.9938 11.9292 4.08763 8.65417 3.89149ZM35.0088 6.96027C31.3467 2.86862 26.0248 0.293625 20.1014 0.293625C18.3619 0.293625 16.6741 0.515732 15.0651 0.933105C17.2443 1.52771 19.5593 2.39761 21.9958 3.61589C27.0684 6.15215 31.4478 6.96878 35.0088 6.96027ZM39.9623 17.9217C35.0683 18.8881 28.3102 18.6896 20.207 14.638C12.6314 10.8502 6.60187 10.8979 2.53534 11.8016C2.32544 11.8482 2.12048 11.8972 1.92047 11.9482C1.38806 13.1061 0.963074 14.3237 0.658142 15.5881C0.983826 15.5011 1.32037 15.4184 1.6676 15.3412C6.60101 14.2449 13.5715 14.2925 21.9958 18.5047C29.5715 22.2925 35.601 22.2448 39.6676 21.3411C39.8069 21.3102 39.9442 21.2782 40.0792 21.2452C40.094 20.9299 40.1014 20.6126 40.1014 20.2936C40.1014 19.4911 40.0542 18.6996 39.9623 17.9217ZM39.4262 25.4659C34.5797 26.3132 28.0184 25.988 20.207 22.0824C12.6314 18.2946 6.60187 18.3423 2.53534 19.246C1.63269 19.4465 0.820679 19.6908 0.10437 19.9487C0.102417 20.0634 0.10144 20.1784 0.10144 20.2936C0.10144 31.3393 9.05573 40.2936 20.1014 40.2936C29.3585 40.2936 37.1467 34.0045 39.4262 25.4659Z"
                    className="ccustom"
                    fill="#ffffff"
                  ></path>{" "}
                </svg>
              </Link>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome Back! 🚀
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Log in to your account to continue managing your finances.
              </p>
            </div>
          </section>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative  mb-5 -mt-16 block lg:hidden">
                <Link
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="/"
                >
                 
                </Link>
                <h2 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                  Welcome Back! 🚀
                </h2>

                <p className="mt-4 leading-relaxed text-black/90">
                  Log in to your account to continue managing your finances.
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form className="w-full shadow-md ring-1 ring-primary/10 px-8 py-10 ">
                    <h1 className="text-2xl py-4 font-semibold">
                      Log in to Your Account
                    </h1>
                    <div className="">
                      <GroupField
                        label="Email"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        value={values.email}
                        onChange={handleChange}
                        error={
                          touched.email && errors.email ? errors.email : ""
                        }
                      />
                      <div className="relative">
                        <GroupField
                          label="Password"
                          name="password"
                          id="password"
                          type={"password"}
                          placeholder="********"
                          value={values.password}
                          onChange={handleChange}
                          error={
                            touched.password && errors.password
                              ? errors.password
                              : ""
                          }
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader /> : "Log in"}
                    </Button>
                    {errorMessage && (
                      <div className="pb-2 pt-4 text-red-600">
                        {errorMessage}
                      </div>
                    )}

                    <div className="pt-20 text-center">
                      <p className="mt-4 text-sm  text-gray-500 sm:mt-0">
                        Don&apos;t have an account?
                        <Link
                          href="/sign-up"
                          className="text-primary font-semibold px-2 underline"
                        >
                          Sign up
                        </Link>
                        .
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
