import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function useBeforeUnload({ when, message }) {
    const history = useHistory();
    const self = useRef(null);

    useEffect(() => {
        self.current = history.block((location, action) => {
            if (when()) return message;
            return true;
        });

        const handleBeforeUnload = (event) => {
            if (!when()) return;
            event.preventDefault();
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            if (self.current) {
                self.current();
                self.current = null;
            }

            window.removeEventListener('beforeunload', handleBeforeUnload)
        };
    }, [message, when]);
}