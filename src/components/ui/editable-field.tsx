import { useState, FunctionComponent, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

type EditableFieldProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
};

export const EditableField: FunctionComponent<EditableFieldProps> = ({ label, value, onSave }) => {
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEdit = () => {
    setInputValue(value);
    setEditing(true);
  };
  const handleSave = () => {
    onSave(inputValue);
    setEditing(false);
  };
  const handleCancel = () => {
    setEditing(false);
    setInputValue(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="relative">
      {isEditing ? (
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
          <label htmlFor="editable-field" className="sr-only">
            {label}
          </label>
          <Input
            id="editable-field"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full h-7 border p-[5px] rounded"
          />
          <div className="flex flex-row justify-end absolute mt-2 w-full h-8 top-7 z-10">
            <Button
              type="button"
              onClick={handleSave}
              className="w-7 h-7 bg-black text-white p-1.5 rounded" // Position the button absolutely to the top right of the parent
            >
              <Check />
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="w-7 h-7 bg-black text-white p-1.5 ml-1 rounded" // Position the button absolutely to the top right of the parent
            >
              <X />
            </Button>
          </div>
        </form>
      ) : (
        <Button
          type="button"
          onClick={handleEdit}
          className="w-full h-10 bg-white text-black p-0 pl-1.5 justify-start"
          variant="ghost"
        >
          {value || <em>None</em>}
        </Button>
      )}
    </div>
  );
};
