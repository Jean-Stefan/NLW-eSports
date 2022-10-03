import {GameController} from 'phosphor-react';
import DuoInfo from '../DuoInfo/DuoInfo';
import * as Dialog from '@radix-ui/react-dialog';

interface DuoCardProps {
    hourEnd: string;
    hourStart: string;
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: DuoCardProps;
    onClick: () => void;
}

function DuoCard({data, onClick}: Props) {
    return (
        <div className='w-[230px] text-white bg-[#2a2634] rounded-lg flex flex-col items-center p-5'>
            <DuoInfo label='Nome' value={data.name} />
            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} ano(s)`}
            />
            <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}
            />
            <DuoInfo
                label='Chamada de áudio'
                value={data.useVoiceChannel ? 'Sim' : 'Não'}
                color={data.useVoiceChannel ? '#34D399' : '#F87171'}
            />
            <Dialog.Trigger
                className='flex w-[100%] items-center justify-evenly rounded-md bg-violet-500 px-4 py-3 font-bold hover:bg-violet-600'
                onClick={onClick}
            >
                <GameController size={24} weight={'regular'} />
                Conectar
            </Dialog.Trigger>
        </div>
    );
}

export default DuoCard;
