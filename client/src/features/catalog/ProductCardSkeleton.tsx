import { Card, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <Grid item xs component={Card} sx={{ height: 357 }}>
            <div style={{ height: 72 }}>
                <CardHeader 
                    title={
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                            
                        />
                    }
                    titleTypographyProps={{
                        sx: {
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "primary.main",
                            minHeight: '2.5em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            textAlign: 'leftr',
                            overflow: 'hidden'
                        }
                    }}
                />
            </div>
            <Skeleton sx={{ height: 146 }} animation="wave" variant="rectangular" />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                    <br />
                    <br />
                    <br />
                    <Skeleton animation="wave" height={10} width="20%" />
                </>
            </CardContent>
        </Grid>
    );
}
