import * as Dialog from '@radix-ui/react-dialog';
import {CheckCircle, X} from 'phosphor-react';

interface Props {
    discord: string;
}

function DuoMatchModal({discord}: Props) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed z-10'>
                <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg 3xs:w-[440px] sm:w-[480px] shadow-lg shadow-black/25'>
                    <Dialog.Title className='text-3xl text-white font-black justify-center items-center flex flex-col'>
                        <Dialog.DialogClose className='mb-2 self-end'>
                            <X className='text-zinc-400' size={24} />
                        </Dialog.DialogClose>
                        <CheckCircle
                            size={64}
                            color={'#34D399'}
                            weight={'bold'}
                        />
                        <p className='mt-8'>Let's play!</p>
                        <p className='text-zinc-400 text-xl font-normal mt-2'>
                            Agora é só começar a jogar!
                        </p>
                    </Dialog.Title>
                    <div className='flex flex-col items-center justify-center mt-8'>
                        <p className='font-semibold text-lg'>
                            Adicione no Discord
                        </p>
                        <p className='bg-zinc-900 w-56 h-14 mt-2 flex items-center justify-center text-zinc-200 select-text text-lg'>
                            {discord}
                        </p>
                    </div>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    );
}

export default DuoMatchModal;
