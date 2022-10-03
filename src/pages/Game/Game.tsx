import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import logoImg from '../../assets/logo-nlw-esports.svg';
import DuoCard from '../../components/DuoCard/DuoCard';
import DuoMatchModal from '../../components/DuoMatchModal/DuoMatchModal';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
}

interface DuoCardProps {
    hourEnd: string;
    hourStart: string;
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

    const game = useLocation().state as Game;

    const getDiscordUser = async (adsId: string) => {
        axios(
            `https://nlw-esports-jean.herokuapp.com/ads/${adsId}/discord`,
        ).then((response) => setDiscordDuoSelected(response.data.discord));
    };

    useEffect(() => {
        axios(
            `https://nlw-esports-jean.herokuapp.com/games/${game.id}/ads`,
        ).then((response) => setDuos(response.data));
    }, []);

    const bannerUrl = game.bannerUrl.replace('-285x380', '');

    return (
        <div className='max-w-[1344px] mx-auto flex-col flex items-center my-20 '>
            <Link to='/'>
                <img
                    src={logoImg}
                    alt=''
                    className='w-[180px] place-self-start'
                />
            </Link>
            <img
                src={bannerUrl}
                className='rounded-lg object-cover mt-8 h-40 sm:w-[44.5%] 3xs:w-[91.5%] '
            />

            <h1 className='text-2xl text-white font-black mt-3 mb-1'>
                {game.title}
            </h1>
            <span className='text-zinc-400 text-lg'>
                Conecte-se e comece a jogar!
            </span>
            {duos.length > 0 ? (
                <div className='flex flex-wrap 3xs:gap-3 sm:gap-6 mt-9 justify-center items-center'>
                    <Dialog.Root>
                        {duos.map((duo) => (
                            <DuoCard
                                data={duo}
                                key={duo.id}
                                onClick={() => getDiscordUser(duo.id)}
                            />
                        ))}
                        <DuoMatchModal discord={discordDuoSelected} />
                    </Dialog.Root>
                </div>
            ) : (
                <p className='text-white mt-28'>
                    Ainda não há anúncios publicados.
                </p>
            )}
        </div>
    );
}

export default Game;
