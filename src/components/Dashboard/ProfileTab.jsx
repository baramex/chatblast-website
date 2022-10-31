import { Button } from "../Misc/Button";
import { Label, TextField } from "../Misc/Fields";

export default function ProfileTab({ user, setUser }) {
    return (<>
        <div className="px-5">
            <h1 className="text-2xl font-semibold text-gray-900">Profil</h1>
        </div>
        <div className="px-6 mt-5 max-w-4xl">
            <form>
                <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                        <Label>Photo</Label>
                        <div className="mt-1 flex items-center">
                            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <img src={user.avatar} className="object-cover aspect-square inline" alt="avatar" />
                            </span>
                            <Button variant="outline" rounded="rounded-md" className="ml-5">
                                Modifier
                            </Button>
                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            label="Nom d'utilisateur"
                            name="username"
                            id="username"
                            defaultValue={user.username}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                        <TextField
                            label="Prénom"
                            name="firstname"
                            id="firstname"
                            defaultValue={user.name.firstname}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <TextField
                            label="Nom"
                            name="lastname"
                            id="lastname"
                            defaultValue={user.name.lastname}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-5">
                        <Label>Adresse email</Label>
                        <div className="flex gap-7">
                            <TextField
                                name="email"
                                id="email"
                                type="email"
                                className="w-full"
                                defaultValue={user.email.address}
                            />

                            <Button variant="outline" color={user.email.isVerified ? "slate" : "amber"} rounded="rounded-md" className="w-28" disabled={user.email.isVerified}>
                                Vérifier
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>);
}