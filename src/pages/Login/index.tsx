import backgroundImage from '@/../public/assets/login-back.webp'
import { FormInput } from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import Logo from "@/../public/assets/svg/logo";
import { useAuthContext } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'


interface ILoginForm {
  username: string, password: string
}

export default function LoginPage() {
  const form = useForm<ILoginForm>({defaultValues: {username: '',password: ''}})

  const { login, isLoading } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (data: ILoginForm) => {
      login(data.username, data.password).then(() => {
        navigate('/')
      }).catch(() => {
        form.setError('username',  { type: 'custom', message: '' })
        form.setError('password', {type: 'custom', message: 'Usuário ou senha inválidos'})
        form.setFocus('username')
      })
  }

  return (
    <div className='flex-1 flex p-8 bg-zinc-900 justify-center'>
      <div className='flex flex-col gap-8 flex-1 p-4 rounded-3xl bg-white shadow-2xl max-w-[1000px] md:flex-row'>
        <img src={backgroundImage} className='w-[45%] object-cover rounded-3xl hidden md:block'/>
        <div className='flex flex-col gap-8 flex-1 justify-between items-center pb-8'>
          <div className='flex flex-1 flex-col items-center justify-center'>
            <Logo width={200}/>
            <p className='text-md text-zinc-700'>Sistema gerenciador de oficinas</p>
          </div>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-1 w-full max-w-[350px] mb-16 flex-col gap-4'>
              <FormInput form={form} name='username' label='Usuário'>
                { (field) => <Input placeholder="Digite aqui..." className="flex-1" {...field} />}
              </FormInput>
              <FormInput form={form} name='password' label='Senha'>
                { (field) => <Input placeholder="Digite aqui..." type='password' className="flex-1" {...field} />}
              </FormInput>
              <div className='flex flex-col gap-8 justify-between'>
                <Button loading={isLoading}>Entrar</Button>
                <Button variant={'link'}>Esqueci minha senha</Button>
              </div>
            </form>
          </Form>
          <p>Ainda não tem conta? <Button variant={'link'} className='pl-0'>Cadastre-se</Button></p>
        </div>
      </div>
    </div>
  )
}
