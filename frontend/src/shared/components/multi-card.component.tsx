import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export type CardListType = {
  title: string;
  description: string;
  image: string;
  routeTo?: string;
  actions?: { id: string; onClick: (id: string) => void }[];
};

export type MultiCardGridProps = {
  cardList: CardListType[];
};

export const MultiCardGrid = ({ cardList }: MultiCardGridProps) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        {cardList.map((card, index) => (
          <Grid key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea
                onClick={() => card.routeTo && navigate(card.routeTo)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

              {card.actions?.length && (
                <CardActions>
                  {card.actions?.map((action) => (
                    <Button
                      key={action.id}
                      size="small"
                      color="primary"
                      onClick={() => action.onClick(action.id)}
                    >
                      {action.id}
                    </Button>
                  ))}
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MultiCardGrid;
