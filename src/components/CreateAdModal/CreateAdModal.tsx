import * as Dialog from '@radix-ui/react-dialog';
import {CaretDown, Check, GameController, XCircle} from 'phosphor-react';
import Input from '../Form/Input';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import axios from 'axios';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface Game {
    id: string;
    title: string;
}

export interface ModalStatus {
    onOpenAlertChange: Dispatch<SetStateAction<boolean>>;
    updateGamesAds: Dispatch<SetStateAction<boolean>>;
}

const successAlert = {
    title: 'Vai se preparando para o jogo',
    text: 'Seu anúncio foi criado com successo.',
};

const errorAlert = {
    title: 'Sua princesa está em outro castelo',
    text: 'Erro ao criar o anúncio.',
};

function CreateAdModal({onOpenAlertChange, updateGamesAds}: ModalStatus) {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<string>();
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertText, setAlertText] = useState({title: '', text: ''});

    useEffect(() => {
        axios('https://nlw-esports-jean.herokuapp.com/games').then((response) =>
            setGames(response.data),
        );
    }, []);

    const handleCreateAd = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            return;
        }

        try {
            await axios.post(
                `https://nlw-esports-jean.herokuapp.com/games/${selectedGame}/ads`,
                {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlaying),
                    discord: data.discord,
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel,
                },
            );
            setAlertText(successAlert);
            setAlertOpen(!alertOpen);
            onOpenAlertChange(!open);
            updateGamesAds(true);
        } catch (error) {
            console.log(error);
            setAlertText(errorAlert);
            setAlertOpen(!alertOpen);
        }
    };

    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/60 inset-0 fixed z-10'>
                    <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg 3xs:w-[400px] sm:w-[480px] shadow-lg shadow-black/25'>
                        <Dialog.Title className='text-3xl text-white font-black'>
                            Publique um anúncio
                        </Dialog.Title>

                        <form
                            onSubmit={handleCreateAd}
                            className='mt-8 flex flex-col gap-4'
                        >
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='game' className='font-semibold'>
                                    Qual o game?
                                </label>
                                <Select.Root
                                    onValueChange={(game) =>
                                        setSelectedGame(game)
                                    }
                                >
                                    <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center radix-placeholder:text-zinc-500'>
                                        <Select.Value placeholder='Selecione o game que deseja jogar' />
                                        <Select.Icon>
                                            <CaretDown />
                                        </Select.Icon>
                                    </Select.Trigger>

                                    <Select.Portal>
                                        <Select.Content className='overflow-hidden bg-zinc-900 text-white text-sm z-10'>
                                            <Select.Viewport>
                                                {games.map((game) => {
                                                    return (
                                                        <Select.Item
                                                            key={game.id}
                                                            value={game.id}
                                                            className='py-3 px-4 hover:bg-violet-500 focus:bg-violet-500'
                                                        >
                                                            <Select.ItemText>
                                                                {game.title}
                                                            </Select.ItemText>
                                                        </Select.Item>
                                                    );
                                                })}
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='name' className='font-semibold'>
                                    Seu nome (ou nickname)
                                </label>
                                <Input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Como te chamam dentro do game?'
                                />
                            </div>
                            <div className='grid sm:grid-cols-2 3xs:gap-3 sm:gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label
                                        htmlFor='yearsPlaying'
                                        className='font-semibold'
                                    >
                                        Joga há quantos anos?
                                    </label>
                                    <Input
                                        id='yearsPlaying'
                                        type='number'
                                        placeholder='Tudo bem ser ZERO'
                                        min={0}
                                        max={30}
                                        name='yearsPlaying'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label
                                        htmlFor='discord'
                                        className='font-semibold'
                                    >
                                        Qual o seu Discord?
                                    </label>
                                    <Input
                                        id='discord'
                                        type='text'
                                        placeholder='Usuario#0000'
                                        name='discord'
                                    />
                                </div>
                            </div>
                            <div className='flex 3xs:flex-col sm:flex-row 3xs:gap-3 sm:gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label
                                        htmlFor='weekDays'
                                        className='font-semibold'
                                    >
                                        Quando costuma jogar?
                                    </label>

                                    <ToggleGroup.Root
                                        value={weekDays}
                                        onValueChange={setWeekDays}
                                        type='multiple'
                                        className='grid 3xs:grid-cols-7 sm:grid-cols-4 gap-2'
                                    >
                                        <ToggleGroup.Item
                                            value='0'
                                            title='Domingo'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            D
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value='1'
                                            title='Segunda'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            S
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value='2'
                                            title='Terça'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            T
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value='3'
                                            title='Quarta'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            Q
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value='4'
                                            title='Quinta'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            Q
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value='5'
                                            title='Sexta'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            S
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value='6'
                                            title='Sábado'
                                            className='w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500'
                                        >
                                            S
                                        </ToggleGroup.Item>
                                    </ToggleGroup.Root>
                                </div>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label
                                        htmlFor='hourStart'
                                        className='font-semibold'
                                    >
                                        Qual o horário do dia?
                                    </label>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <Input
                                            id='hourStart'
                                            type='time'
                                            placeholder='De'
                                            name='hourStart'
                                        />
                                        <Input
                                            id='hourEnd'
                                            type='time'
                                            placeholder='Até'
                                            name='hourEnd'
                                        />
                                    </div>
                                </div>
                            </div>
                            <label className='mt-2 flex items-center gap-2 text-sm'>
                                <Checkbox.Root
                                    checked={useVoiceChannel}
                                    onCheckedChange={(checked) => {
                                        checked
                                            ? setUseVoiceChannel(true)
                                            : setUseVoiceChannel(false);
                                    }}
                                    className='w-6 h-6 rounded bg-zinc-900 p-1'
                                >
                                    <Checkbox.Indicator>
                                        <Check className='w-4 h-4 text-emerald-400' />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                Costumo me conectar ao chat de voz
                            </label>
                            <footer className='mt-4 flex justify-end gap-4'>
                                <Dialog.DialogClose className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                                    Cancelar
                                </Dialog.DialogClose>
                                <button
                                    type='submit'
                                    className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                                >
                                    <GameController size={24} />
                                    Encontrar duo
                                </button>
                            </footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
            <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialog.Overlay className='bg-black/60 inset-0 fixed z-20' />
                <AlertDialog.Content className=' z-20 fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg 3xs:w-[420px] sm:w-[480px] shadow-lg shadow-black/25 flex flex-col'>
                    <AlertDialog.Title className='text-3xl text-white font-black'>
                        {alertText.title}
                    </AlertDialog.Title>
                    <AlertDialog.Description className='text-white mt-8'>
                        {alertText.text}
                    </AlertDialog.Description>
                    <AlertDialog.Action className='mt-8 self-center bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                        <XCircle size={24} />
                        Fechar
                    </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}

export default CreateAdModal;
