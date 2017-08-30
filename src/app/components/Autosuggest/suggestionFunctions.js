import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { suggestions } from './baterySuggestions';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { MenuItem } from 'material-ui/Menu';

export function renderInput(inputProps) {
    const { classes, home, value, ref, ...other } = inputProps;
  
    return (
      <TextField
        autoFocus={home}
        className={classes.textField}
        value={value}
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
    );
  }
  
export function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight
              ? <span key={index} style={{ fontWeight: 300 }}>
                  {part.text}
                </span>
              : <strong key={index} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>;
          })}
        </div>
      </MenuItem>
    );
  }
  
export function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
  
    return (
      <Paper {...containerProps} square  style={{zIndex:9999}}  >
        {children}
      </Paper>
    );
  }
  
export function getSuggestionValue(suggestion) {
    return suggestion.id;
  }
  
export function getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }