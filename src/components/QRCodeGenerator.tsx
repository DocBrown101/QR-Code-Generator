import {useState, useEffect, useRef} from 'react';
import {QRCodeSVG} from 'qrcode.react';
import {
  Box,
  Container,
  TextField,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Tab
} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';

export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState('1');
  const [text, setText] = useState('https://example.com');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState('WPA');
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [size, setSize] = useState(200);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  const currentQrValue = activeTab === '1'
    ? text
    : `WIFI:T:${security};S:${ssid};P:${password};`;

  useEffect(() => {
    if (qrRef.current && currentQrValue) {
      const svgElement = qrRef.current.querySelector('svg');
      if (svgElement) {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const encodedData = encodeURIComponent(svgString);
        setQrDataUrl(`data:image/svg+xml,${encodedData}`);
      }
    }
  }, [currentQrValue, errorLevel, size]);

  const handleTabChange = (event: Event, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{display: 'flex', alignItems: 'center', py: 4}}>
        <Paper sx={{p: 4, width: '100%'}}>
          <TabContext value={activeTab}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 3}}>
              <TabList onChange={handleTabChange} centered>
                <Tab label="Text" value="1" />
                <Tab label="WiFi" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{p: 0}}>
              <TextField
                fullWidth
                label="Text eingeben"
                variant="outlined"
                value={text}
                onChange={(e) => setText((e.target as HTMLInputElement).value)}
                placeholder="https://example.com"
                sx={{mb: 3}}
              />
            </TabPanel>

            <TabPanel value="2" sx={{p: 0}}>
              <TextField
                fullWidth
                label="SSID (Netzwerkname)"
                variant="outlined"
                value={ssid}
                onChange={(e) => setSsid((e.target as HTMLInputElement).value)}
                placeholder="Mein WiFi"
                sx={{mb: 2}}
              />

              <TextField
                fullWidth
                label="Passwort"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                placeholder="Passwort eingeben"
                sx={{mb: 2}}
              />

              <FormControl fullWidth sx={{mb: 3}}>
                <InputLabel id="security-label">Sicherheit</InputLabel>
                <Select
                  labelId="security-label"
                  id="security-select"
                  value={security}
                  label="Sicherheit"
                  onChange={(e) => setSecurity((e.target as HTMLInputElement).value)}
                >
                  <MenuItem value="WPA">WPA/WPA2</MenuItem>
                  <MenuItem value="WEP">WEP</MenuItem>
                  <MenuItem value="nopass">Kein Passwort</MenuItem>
                </Select>
              </FormControl>
            </TabPanel>
          </TabContext>

          <FormControl fullWidth sx={{mb: 3}}>
            <InputLabel id="error-level-label">Error Correction Level</InputLabel>
            <Select
              labelId="error-level-label"
              id="error-level-select"
              value={errorLevel}
              label="Error Correction Level"
              onChange={(e) => setErrorLevel((e.target as HTMLInputElement).value as 'L' | 'M' | 'Q' | 'H')}
            >
              <MenuItem value="L">L - Low (7%)</MenuItem>
              <MenuItem value="M">M - Medium (15%)</MenuItem>
              <MenuItem value="Q">Q - Quartile (25%)</MenuItem>
              <MenuItem value="H">H - High (30%)</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{mb: 4}}>
            <Typography gutterBottom>
              Größe: {size}px
            </Typography>
            <Slider
              value={size}
              onChange={(e, newValue) => setSize(newValue as number)}
              min={100}
              max={400}
              step={10}
              valueLabelDisplay="auto"
              marks={[
                {value: 100, label: '100px'},
                {value: 250, label: '250px'},
                {value: 400, label: '400px'}
              ]}
            />
          </Box>

          {/* Verstecktes SVG für Konvertierung */}
          <Box ref={qrRef} sx={{display: 'none'}}>
            {currentQrValue && (
              <QRCodeSVG
                value={currentQrValue}
                size={size}
                level={errorLevel}
                marginSize={2}
              />
            )}
          </Box>

          {/* Angezeigter QR-Code */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {currentQrValue && qrDataUrl ? (
              <Box sx={{p: 2}}>
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  style={{display: 'block'}}
                />
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {activeTab === '1'
                  ? 'Gib Text ein, um QR Code zu generieren'
                  : 'Gib SSID und Passwort ein, um WiFi QR Code zu generieren'}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
