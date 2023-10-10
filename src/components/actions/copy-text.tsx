'use client'

import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
    textToCopy: string;
    onCopySuccessMessage?: string;
    duration?: number;
}

const CopyButton: React.FC<CopyButtonProps> = ({
    textToCopy,
    onCopySuccessMessage = "Copied!",
    duration = 4000
}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isCopied) {
            timeoutId = setTimeout(() => {
                setIsCopied(false);
            }, duration);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isCopied, duration]);

    const handleCopy = () => {
        setIsCopied(true);
    };

    return (
        <div>
            <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                <Button disabled={isCopied} className={cn('', isCopied && 'bg-green-500 disabled:opacity-90 text-white px-6')} variant={'outline'}>{isCopied ? (<span>{onCopySuccessMessage}</span>) : (<span>Copy Link</span>)}</Button>
            </CopyToClipboard>
        </div>
    );
};

export default CopyButton;
