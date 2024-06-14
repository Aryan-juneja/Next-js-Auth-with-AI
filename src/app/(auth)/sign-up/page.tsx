'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Loader2} from 'lucide-react'
const Page = () => {
  const [username, setusername] = useState('')
  const [usernameMssg, setusernameMssg] = useState('')
  const [isCheckingUsername, setisCheckingUsername] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter();

  // Zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })
    const debounced =useDebounceCallback(setusername,300);
    useEffect(() => {
      const checkUsernameUnique = async () => {
        if (username) {
          setisCheckingUsername(true);
          setusernameMssg(''); // Reset message
          try {
            const response = await axios.get<ApiResponse>(
              `/api/unique-username-check?username=${username}`
            );
            setusernameMssg(response.data.message);
          } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setusernameMssg(
              axiosError.response?.data.message ?? 'Error checking username'
            );
          } finally {
            setisCheckingUsername(false);
          }
        }
      };
      checkUsernameUnique();
    }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setisSubmitting(true);
    try {
      const response = await axios.post('/api/sign-up', data);
      toast({
        title: 'success',
        description: response.data.messsage
      })
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.log("error in signUp of user", error)
      const axioserror = error as AxiosError<ApiResponse>
      let errorMssg = axioserror.response?.data.message;
      toast({
        title: "sign-Up failed",
        description: errorMssg,
        variant: "destructive"
      })
    }
    finally {
      setisSubmitting(false)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMssg && (
                    <p
                      className={`text-sm ${
                        usernameMssg === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMssg}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" />
                  <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
