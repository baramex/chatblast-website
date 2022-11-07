import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { TextAreaField, TextField } from "./Fields";

export function ContactForm({ user, ...props }) {
    return (<form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" {...props}>
        <TextField
            id="email"
            name="email"
            label="Adresse email"
            type='email'
            autoComplete="email"
            className='sm:col-span-2'
            defaultValue={user?.email?.address}
            required
        />
        <TextField
            id="subject"
            name="subject"
            label="Sujet"
            type='text'
            autoComplete="off"
            className='sm:col-span-2'
            required
        />
        <TextAreaField
            id="message"
            label="Message"
            name="message"
            rows={4}
            className="sm:col-span-2"
            defaultValue={''}
            autoComplete="off"
            maxLength={512}
            required
        />
        <div className="sm:col-span-2">
            <Button
                type="submit"
                variant="solid"
                color="emerald"
                className="w-full py-3.5"
            >
                Envoyer <EnvelopeIcon className='ml-2 stroke-2 stroke-current' width="20" />
            </Button>
        </div>
    </form>);
}