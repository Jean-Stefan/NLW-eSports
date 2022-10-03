import {MagnifyingGlassPlus} from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg overflow-hidden'>
            <div className='bg-[#2a2634] py-6 px-8 flex 3xs:flex-col md:flex-row 3xs:gap-3 md:gap-0 justify-between items-center  '>
                <div>
                    <strong className='2xs:text-2xl xs:text-1xl text-white font-black block'>
                        Não encontrou seu duo?
                    </strong>
                    <span className='text-zinc-400 block 3xs:text-sm 2xs:text-base'>
                        Publique um anúncio para encontrar novos players
                    </span>
                </div>
                <Dialog.Trigger className='px-4 py-3 bg-violet-500 font-semibold text-white rounded hover:bg-violet-600 flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    );
}

export default CreateAdBanner;
