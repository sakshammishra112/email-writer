import React, { useState } from 'react';
import {
    Container, Typography, Box, TextField, InputLabel, Select, MenuItem,
    FormControl, Button, CircularProgress, Snackbar, Alert, CssBaseline, Paper, Switch, FormControlLabel
} from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
    const [emailContent, setEmailContent] = useState('');
    const [tone, setTone] = useState('');
    const [replyLength, setReplyLength] = useState('medium');
    const [signature, setSignature] = useState('');
    const [includeSignature, setIncludeSignature] = useState(false);
    const [generatedReply, setGeneratedReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setGeneratedReply('');
        try {
            const response = await axios.post("http://localhost:8080/api/email/generate", {
                emailContent,
                tone,
                replyLength,
                signature: includeSignature ? signature : ''
            });
            setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
        } catch (error) {
            setError('Failed to generate email reply. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
        setSnackbarOpen(true);
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
                    py: 6
                }}
            >
                <Container maxWidth="sm">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                            EmailCraft Pro
                        </Typography>
                        <Typography variant="subtitle1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
                            Powered by Gemini AI – Generate smart, context-aware replies instantly.
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                variant="outlined"
                                label="Paste the original email here"
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Tone (Optional)</InputLabel>
                                <Select
                                    value={tone}
                                    label="Tone (Optional)"
                                    onChange={(e) => setTone(e.target.value)}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="professional">Professional</MenuItem>
                                    <MenuItem value="casual">Casual</MenuItem>
                                    <MenuItem value="friendly">Friendly</MenuItem>
                                    <MenuItem value="concise">Concise</MenuItem>
                                    <MenuItem value="apologetic">Apologetic</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Reply Length</InputLabel>
                                <Select
                                    value={replyLength}
                                    label="Reply Length"
                                    onChange={(e) => setReplyLength(e.target.value)}
                                >
                                    <MenuItem value="short">Short</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="long">Long</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={includeSignature}
                                        onChange={(e) => setIncludeSignature(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Add custom signature"
                                sx={{ mb: 1 }}
                            />
                            {includeSignature && (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Signature"
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            )}
                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                                disabled={!emailContent || loading}
                                fullWidth
                                size="large"
                                sx={{ fontWeight: 600, py: 1.5, mt: 1 }}
                            >
                                {loading ? <CircularProgress size={24} /> : "Generate Reply"}
                            </Button>
                        </Box>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}
                        {generatedReply && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant='h6' gutterBottom>
                                    Generated Reply:
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={6}
                                    variant='outlined'
                                    value={generatedReply}
                                    inputProps={{ readOnly: true }}
                                    sx={{ mb: 2, background: '#f5f5f5' }}
                                />
                                <Button
                                    variant='outlined'
                                    onClick={handleCopy}
                                    fullWidth
                                    sx={{ fontWeight: 600 }}
                                >
                                    Copy to Clipboard
                                </Button>
                            </Box>
                        )}
                    </Paper>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={2000}
                        onClose={() => setSnackbarOpen(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                            Reply copied to clipboard!
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </>
    );
}

export default App;
