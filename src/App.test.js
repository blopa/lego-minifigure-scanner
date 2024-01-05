import React from 'react';
import { render } from '@testing-library/react';
import MinifigureScanner from './App';

// Utils
import * as utils from './utils';

// Mocking the external modules
jest.mock('@zxing/library', () => ({
  BrowserMultiFormatReader: jest.fn().mockImplementation(() => ({
    decodeOnceFromVideoDevice: jest.fn()
  })),
}));

jest.mock('@mui/material', () => ({
  Button: 'button',
  Card: 'card',
  CardContent: 'card-content',
  Container: 'container',
  Typography: 'typography',
  CardMedia: 'card-media',
  QrCodeScannerIcon: 'qr-code-scanner-icon',
}));

jest.mock('./utils', () => ({
  determineMinifigure: jest.fn(),
  isEmptyObject: jest.fn(),
}));

describe('MinifigureScanner Component', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    utils.determineMinifigure.mockClear();
    utils.isEmptyObject.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<MinifigureScanner />);
    expect(getByText('Minifigure Scanner')).toBeInTheDocument();
  });
});
