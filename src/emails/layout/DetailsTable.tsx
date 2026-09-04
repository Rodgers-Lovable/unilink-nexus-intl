import { Row, Column, Text } from "@react-email/components";

export type EmailDetails = Record<string, string | string[] | undefined>;

interface DetailsTableProps {
  details: EmailDetails;
}

/** Renders a details object as label/value rows, skipping empty values. */
export function DetailsTable({ details }: DetailsTableProps) {
  const rows = Object.entries(details).filter(([, value]) => {
    if (value === undefined || value === null || value === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  });

  return (
    <>
      {rows.map(([label, value]) => (
        <Row key={label} style={styles.row}>
          <Column style={styles.labelColumn}>
            <Text style={styles.label}>{label}</Text>
          </Column>
          <Column style={styles.valueColumn}>
            <Text style={styles.value}>{Array.isArray(value) ? value.join(", ") : value}</Text>
          </Column>
        </Row>
      ))}
    </>
  );
}

const styles = {
  row: {
    borderBottom: "1px solid #eef1f5",
  },
  labelColumn: {
    width: "38%",
    verticalAlign: "top" as const,
    padding: "8px 0",
  },
  valueColumn: {
    width: "62%",
    verticalAlign: "top" as const,
    padding: "8px 0",
  },
  label: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
  },
  value: {
    fontSize: "14px",
    color: "#1b2a4a",
    margin: 0,
    fontWeight: 500,
  },
};
