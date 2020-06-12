package io.agileintelligence.projectboard.EmbeddedPrimaryKey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class ItemIdentifier implements Serializable {

    private String user_email;
    private int bucket_id;
    private String product_author;
    private String product_name;
    private String product_printer;
    private int product_volume;
}
